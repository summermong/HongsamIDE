package chat.backchat.chat.Service;

import chat.backchat.chat.Domain.ChatMessage;
import chat.backchat.chat.Domain.ChatMessageSaveDto;
import chat.backchat.chat.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final RedisTemplate<String, ChatMessage> redisTemplateMessage;

    // 메세지 저장
    public void saveMessage(ChatMessage message) {

        ChatMessageSaveDto chatMessageSaveDto = new ChatMessageSaveDto(message.getRoomId(), message.getSender(),
                message.getMessage(), message.getDate(), message.getTime());
        // DB에 저장
        chatRepository.save(chatMessageSaveDto);

        redisTemplateMessage.opsForList().rightPush(message.getRoomId(), message);

        redisTemplateMessage.expire(message.getRoomId(), 1, TimeUnit.MINUTES);

    }


//    private Map<String, ChatRoom> chatRooms;
//
//    @PostConstruct
//    private void init() {
//        chatRooms = new LinkedHashMap<>();
//    }
//
//    // 채팅방 생성
//    public ChatRoom createRoom(String name) {
//        ChatRoom chatRoom = ChatRoom.create(name);
//        chatRooms.put(chatRoom.getRoomId(), chatRoom);
//        log.info("채팅방 개설 성공");
//        return chatRoom;
//    }

}

