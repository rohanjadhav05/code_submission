#include <iostream>
#include <sstream>
#include <fstream>
#include <cstdlib>
#include <stdexcept>
#include <vector>
#include <string>
#include <unordered_map>
using namespace std;
class Solution {
public:
    bool lemonadeChange(vector<int>& bills) {
         std::cout << "Bills array: ";
    for (int bill : bills) {
        std::cout << bill << " ";
    }
    std::cout << std::endl;
       
        // write the code here
        return false; 
    }
};int main(int argc, char* argv[]) {
    
    string str = getenv("bills");

    vector<int> bills;
    stringstream ss(str);
    string item;

    while (getline(ss, item, ',')) {
        bills.push_back(stoi(item));
    }

    bool expected_result = (string(argv[1]) == "true");

    Solution s;
    bool result = s.lemonadeChange(bills);

    if (expected_result != result) {
        ofstream outfile("output.txt");
        outfile << boolalpha << result;
    }
     return 0;
}
