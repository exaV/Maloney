package ch.delconte.maloney.maloneybackend

import ch.delconte.maloney.maloneybackend.data.*
import com.google.gson.JsonParser
import mu.KLogging
import org.jsoup.Jsoup
import org.springframework.beans.factory.annotation.Autowired
import java.io.File

fun main(args: Array<String>) {
    MaloneyScrapeService(object: MaloneyShowService {
        override fun retrieveShows(): List<MaloneyShowDTO> {
            TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
        }

        override fun retrieveShow(id: Long): MaloneyShowDTO? {
            TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
        }

        override fun addShow(createMaloneyShowDTO: CreateMaloneyShowDTO): MaloneyShowDTO {
            println(createMaloneyShowDTO)
            return MaloneyShowEntity.fromDTO(createMaloneyShowDTO).toDto()
        }
    }).fetchfromDefault(10)
}

