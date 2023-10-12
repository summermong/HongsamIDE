package ide.backide.controller;

import com.amazonaws.services.lambda.runtime.Context;
import org.springframework.cloud.function.adapter.aws.FunctionInvoker;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class LambdaApiGatewayHandler extends FunctionInvoker{
    @Override
    public void handleRequest(InputStream input, OutputStream output, Context context) throws IOException {
        super.handleRequest(input, output, context);
    }
}
