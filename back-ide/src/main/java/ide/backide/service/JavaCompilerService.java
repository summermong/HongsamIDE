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
 * 1. 정상 흐름에서 우리가 여러개 입력값 넣어주고 출력나오는거 HashMap으로 뽑기 -> 출력.txt랑 비교해서 다 맞았는지 하나라도 틀렸는지 확인 --> 정상 흐름에서 응답값 전달
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
public class JavaCompilerService {
    public void compiler(String questionId) throws Exception {

        File javaFile = new File("src/main/resources/question/" + questionId + ".java"); // 만들어놓은 .java 파일 불러오는 부분
        JavaCompiler compiler = ToolProvider.getSystemJavaCompiler(); // 컴파일할 수 있는 컴파일러 모듈만 생성
        File outputDirectory = new File("src/main/resources/question");

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

        } else {   //컴파일 에러 발생
            DiagnosticCollector<JavaFileObject> diagnostics = diag;
            for (Diagnostic<? extends JavaFileObject> diagnostic : diagnostics.getDiagnostics()) {
                sb.append("Error on line " + diagnostic.getLineNumber() + ": " + diagnostic.getMessage(Locale.ENGLISH) + "\n");
            }
            System.out.println(sb);
        }

    }

}
