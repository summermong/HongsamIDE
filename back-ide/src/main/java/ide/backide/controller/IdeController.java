package ide.backide.controller;

import ide.backide.domain.RequestCodeDTO;
import ide.backide.service.CompilerService;
import ide.backide.service.FileIOService;
import ide.backide.service.JavaCompilerService;
import ide.backide.service.JavaFileIOService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.NoSuchFileException;
import java.rmi.NoSuchObjectException;

@Slf4j
@RestController
@RequiredArgsConstructor
public class IdeController {
    private final CompilerService compilerService;
    private final FileIOService fileIOService;

    @ExceptionHandler
    public String handlerEx(FileNotFoundException e) {
        return "파일이 없습니다.";
    }

    @PostMapping("/{questionId}")
    public String getCompileResult(@PathVariable String questionId, @RequestBody RequestCodeDTO requestCode) throws Exception {
        fileIOService.saveFile(requestCode.getRequestCode(), questionId);
        return compilerService.compiler(questionId);

    }

    @GetMapping("/{questionId}")
    public String getSavedFile(@PathVariable String questionId) throws IOException{
        return fileIOService.findFileByName(questionId);
    }

}
