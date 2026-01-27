package org.example.SimpleCalculator;

import java.util.Scanner;

/**
 * 简易计算器实现类，演示基本的算术运算与异常友好处理。
 * 用户通过控制台输入数值和运算符来进行计算。
 */
public class SimpleCalculator {

    // 加法
    public static double addition(double a, double b) {
        return a + b;
    }

    // 减法
    public static double subtraction(double a, double b) {
        return a - b;
    }

    // 乘法
    public static double multiplication(double a, double b) {
        return a * b;
    }

    // 除法，包含对除以零的异常处理
    public static double division(double a, double b) {
        if (b == 0) {
            System.out.println("错误：除数不能为零。");
            return Double.NaN; // 使用非数字表示错误
        }
        return a / b;
    }

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("欢迎使用简易计算器！");
        System.out.print("请输入第一个数: ");
        double num1 = input.nextDouble();
        System.out.print("请输入第二个数: ");
        double num2 = input.nextDouble();

        System.out.println("请选择运算类型 (+, -, *, /): ");
        String operator = input.next();

        try {
            switch (operator) {
                case "+":
                    System.out.printf("%.2f + %.2f = %.2f%n", num1, num2, addition(num1, num2));
                    break;
                case "-":
                    System.out.printf("%.2f - %.2f = %.2f%n", num1, num2, subtraction(num1, num2));
                    break;
                case "*":
                    System.out.printf("%.2f * %.2f = %.2f%n", num1, num2, multiplication(num1, num2));
                    break;
                case "/":
                    double result = division(num1, num2);
                    if (!Double.isNaN(result)) {
                        System.out.printf("%.2f / %.2f = %.2f%n", num1, num2, result);
                    }
                    break;
                default:
                    System.out.println("无效的运算符，请输入 +, -, *, 或 /。");
            }
        } finally {
            input.close(); // 确保资源被释放
        }
    }
}