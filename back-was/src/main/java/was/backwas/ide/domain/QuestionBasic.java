package was.backwas.ide.domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class QuestionBasic {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long id;

    private String title;
    private String level;

    public QuestionBasic() {
    }


}
