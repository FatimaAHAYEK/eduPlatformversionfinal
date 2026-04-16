import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* 🧠 Clean JSON extractor */
function extractJSON(text) {
  const match = text.match(/\{[\s\S]*\}/);
  return JSON.parse(match[0]);
}

app.post("/ai-suggestions", async (req, res) => {
  const students = req.body;

  try {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral-small",
        temperature: 0.3,

        messages: [
          {
            role: "system",
            content: "Tu es un assistant pédagogique expert en différenciation pédagogique."
          },

          {
            role: "user",
            content: `
Tu es un assistant pédagogique spécialisé dans le regroupement des élèves selon leur style d'apprentissage.

Voici la liste des élèves :
${JSON.stringify(students)}

🎯 OBJECTIF PRINCIPAL:
- Regrouper les élèves UNIQUEMENT selon leur style d'apprentissage:
  Visuel, Auditif, Kinesthésique

👥 GROUPES:
- Chaque groupe contient des élèves du même style uniquement
- Nom du groupe = style d'apprentissage

✏️ ACTIVITÉS:
- Donner uniquement des noms d’activités
- Pas de description
- Maximum 3 mots par activité

Exemples:
- "Lecture rapide"
- "Quiz audio"
- "Carte mentale"

⚠️ RÈGLES IMPORTANTES:
- Réponds UNIQUEMENT en JSON valide
- Aucun texte hors JSON
- Aucun markdown
- Pas de \`\`\`

📌 FORMAT EXACT:
{
  "activities": {
    "studentId": ["activité1", "activité2"]
  },
  "groups": [
    {
      "name": "Visuel",
      "criteria": "learning style",
      "studentIds": ["id1", "id2"]
    }
  ]
}
`
          }
        ]
      })
    });

    const data = await response.json();

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return res.status(500).json({ error: "No response from Mistral" });
    }

    let result;

    try {
      result = extractJSON(content);
    } catch (e) {
      console.error("❌ JSON ERROR FROM AI:\n", content);
      return res.status(500).json({
        error: "Invalid JSON from AI",
        raw: content
      });
    }

    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error AI" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));