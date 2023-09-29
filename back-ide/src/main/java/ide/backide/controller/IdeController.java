package ide.backide.controller;

import ide.backide.domain.RequestCodeDTO;
import ide.backide.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.NoSuchFileException;
import java.rmi.NoSuchObjectException;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
public class IdeController {
    private final CompilerService compilerService;
    private final FileIOService fileIOService;
    private final S3Service s3Service;

    @ExceptionHandler
    public String handlerEx(FileNotFoundException e) {
        return "파일이 없습니다.";
    }

    @PostMapping("{uuid}/{questionId}")
    public String getCompileResult(@PathVariable String questionId, @PathVariable String uuid,
                                   RequestCodeDTO requestCode) throws Exception {
        File file = fileIOService.saveFile(requestCode.getRequestCode(), questionId);
        s3Service.putS3(uuid, file);
        return compilerService.compiler(questionId);

    }

    @GetMapping("{uuid}/{questionId}")
    public String getSavedFile(@PathVariable String questionId, @PathVariable String uuid) throws IOException{
        return s3Service.getS3(uuid, questionId);
//        return fileIOService.findFileByName(questionId);
    }

}
