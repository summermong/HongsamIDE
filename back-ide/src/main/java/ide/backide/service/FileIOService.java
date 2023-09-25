package ide.backide.service;

import java.io.IOException;

public interface FileIOService {

    void saveFile(String newCode, String title) throws IOException;

    String findFileByName(String title) throws IOException;



}
