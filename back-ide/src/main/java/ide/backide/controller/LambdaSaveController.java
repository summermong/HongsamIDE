package ide.backide.controller;

import ide.backide.domain.UserRunRequest;
import ide.backide.service.CompilerService;
import ide.backide.service.FileIOService;
import ide.backide.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class LambdaSaveController implements Function<UserRunRequest, String> {

    private final S3Service s3Service;
    private final CompilerService compilerService;
    private final FileIOService fileIOService;


    @Override
    public String apply(UserRunRequest userRunRequest) {
        File file = null;
        if (userRunRequest.getRequestCode().equals("") || userRunRequest.getRequestCode() == null) {
            return "코드를 올바르게 입력하세요.";
        }
        try {
            file = fileIOService.saveFile(userRunRequest.getRequestCode(), userRunRequest.getQuestionId());
        } catch (IOException e) {
            return e.getMessage();
        }
        s3Service.putS3(userRunRequest.getUuid(), file);
        return "저장 성공";
    }
}
