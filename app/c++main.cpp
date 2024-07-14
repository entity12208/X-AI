#include <iostream>
#include <string>

std::string process_input(const std::string& input) {
    return "Processed in C++: " + input;
}

int main(int argc, char* argv[]) {
    if (argc < 2) {
        std::cerr << "No input provided" << std::endl;
        return 1;
    }

    std::string input = argv[1];
    std::cout << process_input(input) << std::endl;
    return 0;
}
