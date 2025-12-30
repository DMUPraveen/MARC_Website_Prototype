import pandas as pd

SHEET_ID = "1lardxEdOL6BTCCHxjU3uGfWWE30H4kxv5pO5OklLwKs"
GID = "0"
url = f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid={GID}"


def get_publications():
    df = pd.read_csv(url)
    print(df)
    # drop empty rows
    df = df.dropna(how="all")
    # rename columns to make lower case and remove spaces
    df.columns = [col.strip().replace(" ", "_").lower() for col in df.columns]
    df["authors"] = df["authors"].apply(
        lambda x: [
            y.strip()
            for y in x.strip()
            .replace("\n", " ")
            .replace("\r", " ")
            .replace(",", ";")
            .split(";")
        ]
    )
    df["people"] = df["people"].apply(
        lambda x: [author.strip() for author in x.split(" ")]
    )
    df["id"] = df.index + 1
    df.to_json(
        "src/publication_collection/publications.json", orient="records", indent=2
    )
    return df


get_publications()
