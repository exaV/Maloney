package ch.delconte.maloney.maloneybackend

import ch.delconte.maloney.maloneybackend.data.MaloneyShowService
import mu.KLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import javax.annotation.PostConstruct

@SpringBootApplication
class MaloneyBackendApplication {
    companion object : KLogging()

    @Autowired
    lateinit var maloneyScraper: MaloneyScrapeService
    @Autowired
    lateinit var maloneyService: MaloneyShowService

    @PostConstruct
    fun runScraperOnce() {
//        maloneyScraper.fetchfromDefault(1)
        val savedshows = maloneyService.retrieveShows()
        logger.info { "database contains ${savedshows.size} saved shows" }
        logger.debug { "saved shows: "+ savedshows.map { "\n$it" } }
    }

}

fun main(args: Array<String>) {
    SpringApplication.run(MaloneyBackendApplication::class.java, *args)


}
