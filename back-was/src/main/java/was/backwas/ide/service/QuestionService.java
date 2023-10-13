package was.backwas.ide.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import was.backwas.ide.domain.QuestionBasic;
import was.backwas.ide.repository.QuestionRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionBasic addQuestion(QuestionBasic newQuestion) {
        return questionRepository.save(newQuestion);
    }

    public List<QuestionBasic> getAllQuestion() {
        return questionRepository.findAll();
    }
}
