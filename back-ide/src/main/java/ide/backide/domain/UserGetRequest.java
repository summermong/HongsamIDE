package ide.backide.domain;

import lombok.Data;

@Data
public class UserGetRequest {
    private String questionId;
    private String uuid;
}
