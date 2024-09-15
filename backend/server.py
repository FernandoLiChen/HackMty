import openai

#API_KEY = open("API_KEY", "r").read()
openai.api_key = "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"

response = openai.chat.completions.create(
    model = "gpt-3.5-turbo",
    messages = [
        {"role": "system", "content": "Eres un asistente de banco que ayuda a las personas con sus dudas sobre educacion financiera."},
        {"role": "user", "content": "Dime una pregunta de educacion financiera."}
    ]
)

print(response)