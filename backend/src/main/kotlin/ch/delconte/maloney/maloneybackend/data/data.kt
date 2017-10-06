package ch.delconte.maloney.maloneybackend.data

import mu.KLogging
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*
import javax.persistence.*
import javax.transaction.Transactional
import javax.persistence.TemporalType



data class MaloneyShowDTO(val id: Long,
                          val title: String,
                          val description: String,
                          val primarySourceUrl: String)

data class CreateMaloneyShowDTO(val srfID: String,
                                val title: String,
                                val description: String,
                                val primarySourceUrl: String,
                                val date: String,
                                val rawJSON: String)

data class MaloneyUrl(val url: String, val protocol: String, val encoding: String)

interface MaloneyShowService {
    fun retrieveShows(): List<MaloneyShowDTO>
    fun retrieveShow(id: Long): MaloneyShowDTO?
    fun addShow(createMaloneyShowDTO: CreateMaloneyShowDTO): MaloneyShowDTO
}

@Entity
@Table(name = "Shows")
internal class MaloneyShowEntity(@Id @GeneratedValue val id: Long? = null,
                                 @Column(unique = true) val srfID: String,
                                 val title: String,
        //TODO somehow handle these strings better (description is short, rawJSON can be quite long)
                                 @Lob val description: String,
                                 @Lob val rawJSON: String,
                                 val primarySourceUrl: String) {

//    @Column(name = "LastTouched", insertable = false, updatable = false)
//    @Temporal(TemporalType.TIMESTAMP)
//    private val lastTouched: Date = Date.from(Instant.MIN)

    @Suppress("unused")
    private constructor() : this(null, "", "", "", "", "")

    fun toDto() = MaloneyShowDTO(id!!, title, description, primarySourceUrl)

    companion object {
        fun fromDTO(createMaloneyShowDTO: CreateMaloneyShowDTO) = MaloneyShowEntity(
                srfID = createMaloneyShowDTO.srfID,
                title = createMaloneyShowDTO.title,
                primarySourceUrl = createMaloneyShowDTO.primarySourceUrl,
                description = createMaloneyShowDTO.description,
                rawJSON = createMaloneyShowDTO.rawJSON
        )
    }
}


@Transactional(Transactional.TxType.MANDATORY)
internal interface MaloneyShowRepository : JpaRepository<MaloneyShowEntity, Long> {
    //    @Query(value = "SELECT COUNT(a)>0 FROM Shows AS a WHERE a.srfID = :srfID")
//    fun existsBySrfId(@Param("srfID") srfID: String) : Boolean
//
    @Query(value = "SELECT a FROM MaloneyShowEntity AS a WHERE a.srfID = :srfID")
    fun findBySrfID(@Param("srfID") srfID: String): List<MaloneyShowEntity>


}

@Service
@Transactional
internal class JpaMaloneyShowService(val repo: MaloneyShowRepository) : MaloneyShowService {
    companion object : KLogging()

    override fun retrieveShows(): List<MaloneyShowDTO> = repo.findAll().map { it.toDto() }
    override fun retrieveShow(id: Long): MaloneyShowDTO? = repo.findOne(id)?.toDto()

    override fun addShow(createMaloneyShowDTO: CreateMaloneyShowDTO): MaloneyShowDTO {
        val existing = repo.findBySrfID(createMaloneyShowDTO.srfID).firstOrNull()
        if (existing != null) {
            logger.info { "show \"${existing.title}\" (${existing.srfID}) already exists with id=${existing.id}" }
            return existing.toDto()
        }
        val entity = repo.save(MaloneyShowEntity.fromDTO(createMaloneyShowDTO))
        return entity.toDto()
    }


}