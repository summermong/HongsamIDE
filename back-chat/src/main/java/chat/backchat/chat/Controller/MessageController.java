package chat.backchat.chat.Controller;

import chat.backchat.chat.Domain.ChatMessage;
import chat.backchat.chat.pubsub.RedisPublisher;
import chat.backchat.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MessageController {

    private final RedisPublisher redisPublisher;
    private final ChatRoomRepository chatRoomRepository;

    /**
     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
     */
    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
//            chatRoomRepository.enterChatRoom(message.getRoomId());
            chatRoomRepository.enterChatRoom(message.getRoomId(),message.getUuid());
            message.setMessage(message.getSender() + "님이 입장하셨습니다.");
        }
        // Websocket에 발행된 메시지를 redis로 발행한다(publish)
        log.info("메세지 전송");
        redisPublisher.publish(chatRoomRepository.getTopic(message.getRoomId()), message);
    }

//    @GetMapping("/redis")
//    public void redisTest() {
//        chatRoomRepository.redisTest();
//    }


    /**
     * stomp 버전
     */
//    private final SimpMessageSendingOperations sendingOperations;
//
//    @MessageMapping("/chat/message") // pub/chat/message가 됨
//    public void enter(ChatMessage message) {
//        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
//            message.setMessage(message.getSender() + "님이 들어옴.");
//        }
//        sendingOperations.convertAndSend("/sub/chat/room/"+message.getRoomId(),message);
//    }

}

