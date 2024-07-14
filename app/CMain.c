#include <stdio.h>
#include <string.h>

void process_input(const char* input, char* output) {
    strcpy(output, "Processed in C: ");
    strcat(output, input);
}

int main(int argc, char* argv[]) {
    if (argc < 2) {
        fprintf(stderr, "No input provided\n");
        return 1;
    }

    char output[100];
    process_input(argv[1], output);
    printf("%s\n", output);
    return 0;
}
