package chat.backchat.chat.Domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter @Setter
@Entity
public class ChatMessageSaveDto {

    @Id @GeneratedValue
    @Column(name = "message_id")
    private Long id;

    private String roomId;

    private String sender;

    private String message;

    private String date;

    private String time;

    public ChatMessageSaveDto() {
    }

    public ChatMessageSaveDto( String roomId, String sender, String message, String date, String time) {
        this.roomId = roomId;
        this.sender = sender;
        this.message = message;
        this.date = date;
        this.time = time;
    }
}
