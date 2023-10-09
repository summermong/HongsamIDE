package chat.backchat.chat.repository;

import chat.backchat.chat.Domain.ChatMessageSaveDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
@Transactional
public class ChatRepository {

    private final EntityManager em;

    public void save(ChatMessageSaveDto chatMessageSaveDto) {
        em.persist(chatMessageSaveDto);
    }
}
