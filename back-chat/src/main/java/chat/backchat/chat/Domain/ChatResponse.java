package chat.backchat.chat.Domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class ChatResponse {

    private int status;
    private Object data;

    public ChatResponse() {
    }

    public ChatResponse(int status, Object data) {
        this.status = status;
        this.data = data;
    }

}
