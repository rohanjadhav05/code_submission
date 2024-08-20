import java.util.*;
import java.io.*;
class Solution {
    public boolean lemonadeChange(int[] bills) {
        // Your implementation here 
    } 
}public class Main { 
    public static void main(String[] args) {
        String bills_str = System.getenv("bills");
        String[] bills_str_arr = bills_str.split(",");
        int[] bills = new int[bills_str_arr.length];
        for(int i=0;i<bills.length;i++)
          bills[i] = Integer.parseInt(bills_str_arr[i]);
        Solution s = new Solution();
        boolean result = s.lemonadeChange(bills);
        boolean expected_result = Boolean. parseBoolean(args[0]);
        if(expected_result != result){
          try (BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))) { 
            writer.write(Boolean.toString(result)); 
          } catch (IOException e) {
            System.out.println("An error occurred while writing to the file.");        
            e.printStackTrace();    
          } 
        }

    }
}