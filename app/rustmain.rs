use std::env;

fn process_input(input: &str) -> String {
    format!("Processed in Rust: {}", input)
}

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() < 2 {
        eprintln!("No input provided");
        std::process::exit(1);
    }
    let input = &args[1];
    println!("{}", process_input(input));
}
