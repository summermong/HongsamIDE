package ide.backide.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

@Service
@Slf4j
public class FileIOService {

    public void saveNewFile(String newCode, String questionId) throws IOException {
        File javaFile = new File("src/main/resources/question/" + questionId + ".java");
        FileWriter writer = new FileWriter(javaFile);
        writer.write(newCode);
        writer.close();
    }
}
