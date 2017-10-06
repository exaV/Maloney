package ch.delconte.maloney.maloneybackend

import ch.delconte.maloney.maloneybackend.data.MaloneyShowDTO
import ch.delconte.maloney.maloneybackend.data.MaloneyShowService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@CrossOrigin
@RequestMapping("/shows")
@RestController
class MaloneyRestService @Autowired constructor(private val maloneyService: MaloneyShowService) {

    @Autowired
    lateinit var maloneyScraper: MaloneyScrapeService

    @RequestMapping(method = arrayOf(RequestMethod.GET))
    fun getShows(): List<MaloneyShowDTO> {
        return maloneyService.retrieveShows()
    }

    @RequestMapping(method = arrayOf(RequestMethod.POST))
    fun gathersomeMore(limit: Int?) {
        maloneyScraper.fetchfromDefault(limit ?: 1)
    }
}