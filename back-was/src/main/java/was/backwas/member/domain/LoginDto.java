package was.backwas.member.domain;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginDto {

    private String email;
    private String password;

    public LoginDto() {
    }

    public LoginDto(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
