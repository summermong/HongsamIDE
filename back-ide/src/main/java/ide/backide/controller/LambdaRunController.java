package ide.backide.controller;

import ide.backide.domain.UserGetRequest;
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
public class LambdaRunController implements Function<UserRunRequest, String> {

    private final S3Service s3Service;
    private final CompilerService compilerService;
    private final FileIOService fileIOService;


    @Override
    public String apply(UserRunRequest userRunRequest) {
        File file = null;
        try {
            file = fileIOService.saveFile(userRunRequest.getRequestCode(), userRunRequest.getQuestionId());
        } catch (IOException e) {
            return e.getMessage();
        }
        s3Service.putS3(userRunRequest.getUuid(), file);
        try {
            return compilerService.compiler(userRunRequest.getQuestionId());
        } catch (Exception e) {
            return "예외 발생";
        }
    }
}
