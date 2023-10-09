package was.backwas.member.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@ToString
public class LoginMemberResponse {

    private String email;
    private String username;
    private String profileUrl;

    public LoginMemberResponse() {
    }

    public LoginMemberResponse(String email, String username, String profileUrl) {
        this.email = email;
        this.username = username;
        this.profileUrl = profileUrl;
    }
}
