import pdfplumber
import pandas as pd

def pdf_to_dataframe(path):

    rows=[]

    with pdfplumber.open(path) as pdf:

        for page in pdf.pages:

            table=page.extract_table()

            if table:
                rows.extend(table)

    df=pd.DataFrame(rows)

    return df