/** @format */

export const javaDefaultValue = `public class Main {
  public static void main(String[] args) {
      System.out.println("Hello, World!");
    
      int num1 = 5;
      int num2 = 10;
      int sum = num1 + num2;
      System.out.println("Sum: " + sum);
      
      for (int i = 1; i <= 10; i++) {
          System.out.print(i + " ");
      }
      System.out.println();
      
      int number = 7;
      if (number % 2 == 0) {
          System.out.println(number + "은(는) 짝수입니다.");
      } else {
          System.out.println(number + "은(는) 홀수입니다.");
      }
  }
}
`;
