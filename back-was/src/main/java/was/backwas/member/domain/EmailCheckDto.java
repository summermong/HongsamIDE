package was.backwas.member.domain;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class EmailCheckDto {

    private String email;

    public EmailCheckDto() {
    }

    public EmailCheckDto(String email) {
        this.email = email;
    }
}
