package ch.delconte.maloney.maloneybackend


import ch.delconte.maloney.maloneybackend.data.CreateMaloneyShowDTO
import ch.delconte.maloney.maloneybackend.data.MaloneyShowService
import ch.delconte.maloney.maloneybackend.data.MaloneyUrl
import com.google.gson.JsonParser
import mu.KLogging
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.io.File

interface Parser {
    fun createDocument(url: String): Document
}

class WebsiteParser : Parser {
    override fun createDocument(url: String) = Jsoup.connect(url).get()
}

class FileParser : Parser {
    override fun createDocument(url: String) = Jsoup.parse(File(url), Charsets.UTF_8.name())
}

@Service
class MaloneyScrapeService @Autowired constructor(private val maloneyShowService: MaloneyShowService) {
    companion object : KLogging()

    fun parse(url: String, limit: Int) {
        val parser = when {
            url.startsWith("http") -> WebsiteParser()
            File(url).isFile -> FileParser()
            else -> throw IllegalArgumentException("neither a file nor a weblink")
        }
        val document = parser.createDocument(url)
        val episodepastcontainers = document.body().getElementsByClass("episode past") +
                document.getElementsByClass("episode  loaded past") +
                document.body().getElementsByClass("episode past ")

        logger.info { "found ${episodepastcontainers.size} past episodes" }
        if (episodepastcontainers.isEmpty()) {
            logger.warn { "could not find any episodes in:\n${document.body().html()}" }
        }


        //TODO handle exceptions by unique constraint of srfid
        val parsedEpisodes = episodepastcontainers
                .map {
                    val popupurl = it.getElementsByClass("open offscreen-text pull-right").attr("href")
                    popupurl.substringAfter("id=")
                }
                .take(limit)
                .map { fetchEpisodeDetailsJson(it) }
                .map { parseDetailsJson(it) }

        parsedEpisodes.forEach { maloneyShowService.addShow(it) }
        //TODO that may not be true
        logger.info { "added ${parsedEpisodes.size} to the repo" }
    }

    fun fetchfromDefault(limit: Int) {
        //    val url = "file:///C:/Users/pdcwi/Downloads/srf%20maloney%20offline%20kopie/Maloney%20-%20Sendungen%20-%20SRF.html"
        val url = """C:/Users/pdcwi/Downloads/srf maloney offline kopie/sendungen.html"""
//    val url = "https://www.srf.ch/sendungen/maloney"
//    val url = """C:\Users\pdcwi\Downloads\srf maloney offline kopie\Maloney - Sendungen - SRF.html"""
//    val popupurl = "https://www.srf.ch/play/radio/popupaudioplayer?id=12557c6f-84e5-4275-b935-11b9f9566361"
        parse(url,limit)
    }

    private fun fetchEpisodeDetailsJson(id: String): String {

        val url = "https://il.srgssr.ch/integrationlayer/2.0/srf/mediaComposition/audio/$id.json"
        val details = Jsoup.connect(url).ignoreContentType(true).get()
        val rawJSON = details.body().text()
        return rawJSON
    }

    private fun parseDetailsJson(rawJSON: String): CreateMaloneyShowDTO {
        val jsonDocument = JsonParser().parse(rawJSON).asJsonObject
        val chapterList = jsonDocument.getAsJsonArray("chapterList")
        //TODO at least log if there are multiple
        if (chapterList.size() > 1) {
            logger.warn { "chapterList has size ${chapterList.size()}. We expected only lists of size 1! chapterList[1] contents:\n ${chapterList[1].asString}}" }
        }
        val episode = chapterList[0].asJsonObject

        val urls = episode.getAsJsonArray("resourceList")
                .map { it.asJsonObject }
                .map {
                    val url = it.get("url").asString
                    val protocol = it.get("protocol").asString
                    val encoding = it.get("encoding").asString

                    MaloneyUrl(url, protocol, encoding)
                }

        val show = CreateMaloneyShowDTO(
                title = episode.get("title").asString,
                description = episode.get("lead").asString,
                date = episode.get("date").asString,
                srfID = episode.get("id").asString,
                //TODO unsafe
                primarySourceUrl = urls.find { it.protocol == "HTTPS" }!!.url,
                rawJSON = rawJSON
        )
        return show
    }
}
