import java.util.*;
import java.io.*;
class Solution {
    public boolean lemonadeChange(int[] bills) {
        // Your implementation here 
    } 
}public class Main { public static void main(String[] args) {Solution s = new Solution();int[] bills = new int[args.length];for (int i = 0; i < args.length; i++) { bills[i] = Integer.parseInt(args[i]);} boolean result = s.lemonadeChange(bills); try (BufferedWriter writer = new BufferedWriter(new FileWriter(\"output.txt\"))) { writer.write(Boolean.toString(result)); } catch (IOException e) {System.out.println(\"An error occurred while writing to the file.\");         e.printStackTrace();    }    }}