package ide.backide.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.tools.*;
import java.io.*;
import java.lang.reflect.Method;

import java.net.URL;
import java.net.URLClassLoader;
import java.util.Arrays;
import java.util.Locale;
/**
 * Java Compiler Api + Reflection
 * 1. Hello.java --> Hello.class (컴파일) --> Compiler API
 * 2. 실행 --> Reflection
 */


/**
 * 앞으로 해야할 것
 * 0. 서비스단 인터페이스화 해서 파라미터에 선택 언어 정보도 넣기
 * 1. 성공했을 때 출력결과 --> HashMap 구조로 각 테스트케이스의 출력결과를 저장 --> S3에 있는 출력.txt랑 모두 동일한지 확인.
 * 2. 여기 컴파일러 메소드 반환타입 String으로 하면서 1. 정상흐름, 2. 컴파일 에러, 3. 런타임 예외 상황별 API 응답으로 리턴
 * 3. 나중에 할 것 : 시간초과 여부, 스택오버플로우 판단
 * 4.
 */


/**
 * 구현 순서
 * 1. 정상 흐름에서 우리가 여러개 입력값 넣어주고 출력나오는거 output.txt -> answer.txt랑 비교해서 다 맞았는지 하나라도 틀렸는지 확인 --> 정상 흐름에서 응답값 전달
 * 2. 컴파일 에러, 런타임 예외 리턴 처리
 *
 *
 *
 * 3. 프론트 -> was -> API Gateway -> ECS  , 중간에 API 매개하는 역할
 * 4. S3 만들어서 파일들 저장
 * 5. 회원가입 시 컨테이너 생성 요청 파이프라인 구축
 *
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class JavaCompilerService implements CompilerService{

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Override
    public String compiler(String questionId) throws Exception {

        File javaFile = new File("/tmp/" + questionId + ".java"); // 만들어놓은 .java 파일 불러오는 부분
        JavaCompiler compiler = ToolProvider.getSystemJavaCompiler(); // 컴파일할 수 있는 컴파일러 모듈만 생성
        File outputDirectory = new File("/tmp");

        StringBuilder sb = new StringBuilder();


        Iterable<String> options = Arrays.asList("--release", "11"); // 컴파일러 자바 버전 설정
        StandardJavaFileManager fileManager = compiler.getStandardFileManager(null, null, null);
        fileManager.setLocation(StandardLocation.CLASS_OUTPUT, Arrays.asList(outputDirectory));
        Iterable<? extends JavaFileObject> compilationUnits = fileManager.getJavaFileObjectsFromFiles(Arrays.asList(javaFile));
        DiagnosticCollector<JavaFileObject> diag = new DiagnosticCollector<>();

        JavaCompiler.CompilationTask task = compiler.getTask(null, fileManager, diag, options, null, compilationUnits);

        boolean success = task.call();
        /**
         * 여기까지가 Java Complier API의 역할
         */


        if (success) {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PrintStream printStream = new PrintStream(outputStream);
            PrintStream originalOut = System.out; // 원래의 표준 출력 보관
            System.setOut(printStream); // 표준 출력을 ByteArrayOutputStream으로 리다이렉션

            // 컴파일된 .class 파일이 있는 디렉토리를 클래스 로더에 추가
            URLClassLoader classLoader = URLClassLoader.newInstance(new URL[]{new File("/tmp").toURI().toURL()});

            // 클래스 로드
            Class<?> loadedClass = Class.forName(questionId, true, classLoader);

            // 메소드 호출
            Method mainMethod = loadedClass.getMethod("main", String[].class);
            InputStream originalIn = System.in;
            getS3File(questionId, "input");
            getS3File(questionId, "answer");
            System.setIn(new FileInputStream("/tmp/input.txt"));
            try {
                mainMethod.invoke(null, (Object) new String[]{});
            } catch (Exception e) {
                return e.getCause().toString();
            }
            // 클래스 로더 닫기
            classLoader.close();
            System.setIn(originalIn);
            System.setOut(originalOut);
            FileOutputStream resultFile = new FileOutputStream("/tmp/output.txt");
            resultFile.write(outputStream.toByteArray());
            resultFile.close();
            outputStream.reset();
            if(compareFiles("/tmp/output.txt", "/tmp/answer.txt")) {
                return "정답입니다.";
            } else {
                return "틀렸습니다.";
            }

        } else {   //컴파일 에러 발생
            DiagnosticCollector<JavaFileObject> diagnostics = diag;
            for (Diagnostic<? extends JavaFileObject> diagnostic : diagnostics.getDiagnostics()) {
                sb.append("Error on line " + diagnostic.getLineNumber() + ": " + diagnostic.getMessage(Locale.ENGLISH) + "\n");
            }
            return sb.toString();
        }

    }

    @Override
    public void getS3File(String questionId, String type) throws IOException {
        GetObjectRequest getObjectRequest = new GetObjectRequest(bucket, "admin/" + questionId + "/" + type + ".txt");
        File file = new File("/tmp/" + type + ".txt");
        amazonS3.getObject(getObjectRequest, file);
    }


    private static boolean compareFiles(String outputPath, String answerPath) {
        try {
            BufferedReader outBr = new BufferedReader(new FileReader(outputPath));
            BufferedReader ansBr = new BufferedReader(new FileReader(answerPath));

            String outLine, ansLine;
            while((outLine = outBr.readLine()) != null && (ansLine = ansBr.readLine()) != null) {
                if (!outLine.equals(ansLine)) {
                    return false;
                }
            }
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

}
