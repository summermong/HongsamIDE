package was.backwas.member.domain;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberResponse {

    private int status;
    private Object data;

    public MemberResponse() {
    }

    public MemberResponse(int status, Object data) {
        this.status = status;
        this.data = data;
    }
}
