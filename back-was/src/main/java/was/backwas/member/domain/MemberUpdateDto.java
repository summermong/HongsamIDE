package was.backwas.member.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class MemberUpdateDto {

    private String username;
    private String password;

    public MemberUpdateDto() {
    }

    public MemberUpdateDto(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
