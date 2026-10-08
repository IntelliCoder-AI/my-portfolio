from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "Anurag-Kumar-Srivastava-Python-Data-Engineer-Resume.pdf"
PUBLIC_OUTPUT = ROOT / "public" / "anurag-kumar-srivastava-python-data-engineer-resume-v2.pdf"


def register_fonts():
    font_dir = Path(r"C:\Windows\Fonts")
    regular = font_dir / "arial.ttf"
    bold = font_dir / "arialbd.ttf"
    if regular.exists() and bold.exists():
        pdfmetrics.registerFont(TTFont("ResumeSans", str(regular)))
        pdfmetrics.registerFont(TTFont("ResumeSans-Bold", str(bold)))
        pdfmetrics.registerFontFamily(
            "ResumeSans",
            normal="ResumeSans",
            bold="ResumeSans-Bold",
            italic="ResumeSans",
            boldItalic="ResumeSans-Bold",
        )
        return "ResumeSans", "ResumeSans-Bold"
    return "Helvetica", "Helvetica-Bold"


BODY_FONT, BOLD_FONT = register_fonts()


def link(label: str, url: str) -> str:
    return f'<link href="{url}" color="#000000"><u>{label}</u></link>'


def section(title: str, story: list, styles: dict):
    story.append(Spacer(1, 7))
    story.append(Paragraph(title.upper(), styles["section"]))
    story.append(HRFlowable(width="100%", thickness=0.55, color=colors.HexColor("#5A5A5A"), spaceBefore=1.5, spaceAfter=4.5))


def bullet(text: str, story: list, styles: dict):
    story.append(Paragraph(f"&#8226;&nbsp;&nbsp;{text}", styles["bullet"]))


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC_OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        rightMargin=0.55 * inch,
        leftMargin=0.55 * inch,
        topMargin=0.42 * inch,
        bottomMargin=0.42 * inch,
        title="Anurag Kumar Srivastava Resume",
        author="Anurag Kumar Srivastava",
        subject="Resume for Python Developer, Data Engineer, and GenAI Engineer roles",
    )

    base = getSampleStyleSheet()
    styles = {
        "name": ParagraphStyle(
            "Name", parent=base["Title"], fontName=BOLD_FONT, fontSize=18.5,
            leading=20, alignment=TA_CENTER, textColor=colors.black,
            spaceAfter=2,
        ),
        "target": ParagraphStyle(
            "Target", parent=base["Normal"], fontName=BOLD_FONT, fontSize=10.1,
            leading=11.8, alignment=TA_CENTER, textColor=colors.black,
            spaceAfter=2.5,
        ),
        "contact": ParagraphStyle(
            "Contact", parent=base["Normal"], fontName=BODY_FONT, fontSize=8.7,
            leading=10.3, alignment=TA_CENTER, textColor=colors.black,
            spaceAfter=7,
        ),
        "section": ParagraphStyle(
            "Section", parent=base["Heading2"], fontName=BOLD_FONT, fontSize=10.6,
            leading=12.2, textColor=colors.black, spaceBefore=0, spaceAfter=0,
            keepWithNext=True,
        ),
        "body": ParagraphStyle(
            "Body", parent=base["Normal"], fontName=BODY_FONT, fontSize=9.55,
            leading=13.2, textColor=colors.black, spaceAfter=4,
        ),
        "skill": ParagraphStyle(
            "Skill", parent=base["Normal"], fontName=BODY_FONT, fontSize=9.3,
            leading=12.5, textColor=colors.black, spaceAfter=3,
        ),
        "project": ParagraphStyle(
            "Project", parent=base["Normal"], fontName=BOLD_FONT, fontSize=9.65,
            leading=12.5, textColor=colors.black, spaceBefore=4.5, spaceAfter=1.8,
            keepWithNext=True,
        ),
        "links": ParagraphStyle(
            "Links", parent=base["Normal"], fontName=BODY_FONT, fontSize=8.75,
            leading=11.5, textColor=colors.black, spaceAfter=2.8,
        ),
        "bullet": ParagraphStyle(
            "Bullet", parent=base["Normal"], fontName=BODY_FONT, fontSize=9.25,
            leading=12.7, textColor=colors.black, leftIndent=10, firstLineIndent=-10,
            spaceAfter=2.2,
        ),
    }

    story = [
        Paragraph("Anurag Kumar Srivastava", styles["name"]),
        Paragraph("Python Developer | Data Engineer | GenAI Engineer", styles["target"]),
        Paragraph(
            "Bhubaneswar, Odisha, India&nbsp;&nbsp;|&nbsp;&nbsp;anuragsrivastava3344@gmail.com&nbsp;&nbsp;|&nbsp;&nbsp;"
            + link("GitHub", "https://github.com/IntelliCoder-AI")
            + "&nbsp;&nbsp;|&nbsp;&nbsp;"
            + link("LinkedIn", "https://www.linkedin.com/in/anurag-kumar-srivastava/"),
            styles["contact"],
        ),
    ]

    section("Professional Summary", story, styles)
    story.append(Paragraph(
        "Computer Science postgraduate focused on Python development, data engineering, and practical GenAI systems. "
        "Builds reliable REST APIs, analytical workflows, ETL-style data pipelines, relational database solutions, RAG applications, and AI-agent workflows, with hands-on experience deploying usable applications to the cloud.",
        styles["body"],
    ))

    section("Technical Skills", story, styles)
    skill_rows = [
        ("Programming", "Python, SQL"),
        ("Data Engineering", "Pandas, NumPy, ETL and data pipelines, PostgreSQL, MySQL, SQLite, data cleaning, transformation, analysis, and visualization"),
        ("GenAI", "LLMs, RAG, LangChain, LangGraph, AI agents, embeddings, FAISS, vector databases, prompt engineering"),
        ("Backend", "FastAPI, Flask, REST APIs, data validation, CRUD workflows"),
        ("Cloud and DevOps", "AWS, Docker, Terraform, Git, GitHub Actions, CI/CD, Render"),
    ]
    for heading, values in skill_rows:
        story.append(Paragraph(
            f'<font name="{BOLD_FONT}">{heading}:</font> {values}',
            styles["skill"],
        ))

    section("Education", story, styles)
    story.append(Paragraph("Master of Computer Applications (MCA)", styles["project"]))
    story.append(Paragraph("<b>Academic Year:</b> 2024 - 2026&nbsp;&nbsp;|&nbsp;&nbsp;<b>CGPA:</b> 8.74", styles["body"]))
    story.append(Paragraph("Technical focus: Python, data engineering, databases, cloud fundamentals, and applied AI systems.", styles["body"]))
    story.append(Paragraph("Bachelor of Computer Applications (BCA)", styles["project"]))
    story.append(Paragraph("<b>Academic Year:</b> 2021 - 2024&nbsp;&nbsp;|&nbsp;&nbsp;<b>CGPA:</b> 7.67", styles["body"]))
    story.append(Paragraph("Foundation in programming, database systems, software development, and computer applications.", styles["body"]))

    section("Project Experience", story, styles)

    story.append(Paragraph("Chicago Crime Analytics Platform | Python, Flask, Pandas, SQLite, REST APIs", styles["project"]))
    story.append(Paragraph(
        f'{link("GitHub Repository", "https://github.com/IntelliCoder-AI/chicago-crime-analytics-platform")} &nbsp;|&nbsp; '
        f'{link("Live Demo", "https://chicago-crime-analytics.onrender.com/")}', styles["links"]
    ))
    bullet("Turned raw Chicago crime records into accessible analytical dashboards and visual summaries, helping users identify patterns without working directly with source data.", story, styles)
    bullet("Centralized record access through Flask REST APIs and SQLite CRUD workflows, keeping analytical views and data operations consistent.", story, styles)
    bullet("Used Pandas-based cleaning and transformation workflows to prepare data for queries, summaries, and visual exploration.", story, styles)

    story.append(Paragraph("ContextIQ RAG Application | Python, FastAPI, React, LangChain, FAISS, LLMs", styles["project"]))
    story.append(Paragraph(
        f'{link("GitHub Repository", "https://github.com/IntelliCoder-AI/ContextIQ-intelligent-answers-based-on-your-context-RAG-")} &nbsp;|&nbsp; '
        f'{link("Live Demo", "https://contextiq-rag-demo.anuragsrivastava3344.chatgpt.site")}', styles["links"]
    ))
    bullet("Improved answer relevance by grounding LLM responses in retrieved content from uploaded PDF, Markdown, and text documents.", story, styles)
    bullet("Implemented embedding-based search with LangChain and FAISS so users can receive context-aware answers instead of generic model responses.", story, styles)
    bullet("Connected a FastAPI service to a React interface for source-aware answers, summaries, and practice workflows, then published a public interactive demo.", story, styles)

    story.append(Paragraph("TaskFlow | Python, Flask, SQLite, REST APIs", styles["project"]))
    story.append(Paragraph(
        f'{link("GitHub Repository", "https://github.com/IntelliCoder-AI/fullstack-task-manager-taskflow")} &nbsp;|&nbsp; '
        f'{link("Live Demo", "https://taskflow-task-manager-oim4.onrender.com/")}', styles["links"]
    ))
    bullet("Reduced task-tracking friction by combining creation, updates, search, filtering, sorting, and status management in one responsive workflow.", story, styles)
    bullet("Built a Flask REST API with SQLite persistence to keep task operations structured, reusable, and easy to validate.", story, styles)
    bullet("Added input validation and clear user feedback to make common task operations more dependable and understandable.", story, styles)

    section("Certification", story, styles)
    story.append(Paragraph("AWS Cloud Practitioner Essentials - AWS", styles["body"]))

    doc.build(story)
    PUBLIC_OUTPUT.write_bytes(OUTPUT.read_bytes())
    print(OUTPUT)
    print(PUBLIC_OUTPUT)


if __name__ == "__main__":
    build()
