//package chat.backchat.chat.Service;
//
//import chat.backchat.chat.Domain.ChatRoom;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//
//import javax.annotation.PostConstruct;
//import java.util.LinkedHashMap;
//import java.util.Map;
//
//@Slf4j
//@Service
//@RequiredArgsConstructor
//public class ChatService {
//
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
//
//}
//
