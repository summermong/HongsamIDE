package ide.backide.controller;

import ide.backide.domain.RequestCodeDTO;
import ide.backide.service.JavaFileIOService;
//import ide.backide.service.IdeService;
import ide.backide.service.JavaCompilerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
public class IdeController {
    private final JavaCompilerService javaCompilerService;
    private final JavaFileIOService javaFileIOService;


    @PostMapping("/{questionId}")
    public void getCompileResult(@PathVariable String questionId, @RequestBody RequestCodeDTO requestCode) throws Exception {
        javaFileIOService.saveFile(requestCode.getRequestCode(), questionId);
        javaCompilerService.compiler(questionId);
    }

    @GetMapping("/{questionId}")
    public String getSavedFile(@PathVariable String questionId) throws IOException {
        return javaFileIOService.findFileByName(questionId);
    }

}
