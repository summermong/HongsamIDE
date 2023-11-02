package ide.backide.service;

import java.io.File;
import java.io.IOException;

public interface FileIOService {

    File saveFile(String newCode, String title) throws IOException;

    String findFileByName(String title) throws IOException;



}
