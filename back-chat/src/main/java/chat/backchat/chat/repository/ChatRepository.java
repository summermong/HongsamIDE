package chat.backchat.chat.repository;

import chat.backchat.chat.Domain.ChatMessageSaveDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
@Transactional
public class ChatRepository {

    private final EntityManager em;

    public void save(ChatMessageSaveDto chatMessageSaveDto) {
        em.persist(chatMessageSaveDto);
    }

    public List<ChatMessageSaveDto> find50Message(String roomId) {

        return em.createQuery("select m from ChatMessageSaveDto m where m.roomId = :roomId order by m.id desc ",ChatMessageSaveDto.class)
                .setParameter("roomId",roomId)
                .setMaxResults(50)
                .getResultList();

    }

}
