package ide.backide.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.tools.*;
import java.io.*;
import java.lang.reflect.Method;

import java.net.URL;
import java.net.URLClassLoader;
import java.util.Arrays;
import java.util.Locale;


@Slf4j
@Service
public class JavaCompilerService {
    public void compiler(String questionId) throws Exception {

        File javaFile = new File("src/main/resources/question/" + questionId + ".java");
        JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
        File outputDirectory = new File("src/main/resources/question");

        StringBuilder sb = new StringBuilder();

        Iterable<String> options = Arrays.asList("--release", "11");
        StandardJavaFileManager fileManager = compiler.getStandardFileManager(null, null, null);
        fileManager.setLocation(StandardLocation.CLASS_OUTPUT, Arrays.asList(outputDirectory));

        Iterable<? extends JavaFileObject> compilationUnits = fileManager.getJavaFileObjectsFromFiles(Arrays.asList(javaFile));

        DiagnosticCollector<JavaFileObject> diag = new DiagnosticCollector<>();
        JavaCompiler.CompilationTask task = compiler.getTask(null, fileManager, diag, options, null, compilationUnits);


        boolean success = task.call();


        if (success) {
            // 컴파일된 .class 파일이 있는 디렉토리를 클래스 로더에 추가
            URLClassLoader classLoader = URLClassLoader.newInstance(new URL[]{new File("src/main/resources/question").toURI().toURL()});

            // 클래스 로드
            Class<?> loadedClass = Class.forName(questionId, true, classLoader);

            // 메소드 호출
            Method mainMethod = loadedClass.getMethod("main", String[].class);
            try {
                mainMethod.invoke(null, (Object) new String[]{});
            } catch (Exception e) {
                System.out.println(e.getCause());
            }
            // 클래스 로더 닫기
            classLoader.close();

        } else {
            DiagnosticCollector<JavaFileObject> diagnostics = diag;
            for (Diagnostic<? extends JavaFileObject> diagnostic : diagnostics.getDiagnostics()) {
                sb.append("Error on line " + diagnostic.getLineNumber() + ": " + diagnostic.getMessage(Locale.ENGLISH) + "\n");
            }
            System.out.println(sb);
        }

    }

}
