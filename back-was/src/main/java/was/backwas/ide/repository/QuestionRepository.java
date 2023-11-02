package was.backwas.ide.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import was.backwas.ide.domain.QuestionBasic;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
@Transactional
public class QuestionRepository {

    private final EntityManager em;

    public QuestionBasic save(QuestionBasic question) {
        em.persist(question);
        return question;
    }

    public List<QuestionBasic> findAll() {
        String jpql = "select q from QuestionBasic q";

        List<QuestionBasic> resultList = em.createQuery(jpql, QuestionBasic.class)
                .getResultList();
        return resultList;
    }
}
