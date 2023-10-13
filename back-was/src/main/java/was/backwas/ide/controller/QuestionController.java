package was.backwas.ide.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import was.backwas.ide.domain.AddQuestionRequest;
import was.backwas.ide.domain.QuestionBasic;
import was.backwas.ide.service.QuestionService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping("/question")
    public QuestionBasic addQuestion(@RequestBody QuestionBasic newQuestion) {
        return questionService.addQuestion(newQuestion);
    }

    @GetMapping("/question")
    public List<QuestionBasic> getAllQuestion() {
        return questionService.getAllQuestion();
    }
}
