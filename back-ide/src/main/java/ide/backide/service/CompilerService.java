package ide.backide.service;

import java.io.IOException;

public interface CompilerService {

    String compiler(String questionId) throws Exception;

    void getS3File(String questionId, String type) throws IOException;

}
