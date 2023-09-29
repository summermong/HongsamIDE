package ide.backide.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.*;

@Service
@Slf4j
public class JavaFileIOService implements FileIOService{

    @Override
    public File saveFile(String newCode, String title) throws IOException {
        File javaFile = new File("src/main/resources/question/" + title + ".java");
        FileWriter writer = new FileWriter(javaFile);
        writer.write(newCode);
        writer.close();
        return javaFile;
    }

    @Override
    public String findFileByName(String title) throws IOException {
        File javaFile = new File("src/main/resources/question/" + title + ".java");
        BufferedReader br = new BufferedReader(new FileReader(javaFile));
        StringBuilder sb = new StringBuilder();
        String line;
        while((line = br.readLine()) != null) {
            sb.append(line + "\n");
        }
        log.info(String.valueOf(sb));
        return sb.toString();
    }
}
