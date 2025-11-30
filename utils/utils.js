'use client';

export const generateResumePDF = () => {
  // Get all data from localStorage with proper error handling
  const getStorageData = (key, defaultValue = {}) => {
    try {
      const data = localStorage.getItem(key);
      if (!data) return defaultValue;
      const parsed = JSON.parse(data);
      return parsed || defaultValue;
    } catch (error) {
      console.error(`[v0] Error parsing ${key}:`, error);
      return defaultValue;
    }
  };

  const personalInfo = getStorageData('contactInformation', {});
  const workExperiences = getStorageData('workExperiences', []);
  const educations = getStorageData('educations', []);
  const certifications = getStorageData('certifications', []);

  const validateArray = (arr) => {
    return Array.isArray(arr) ? arr : [];
  };

  const validWorkExperiences = validateArray(workExperiences);
  const validEducations = validateArray(educations);
  const validCertifications = validateArray(certifications);

  // Create HTML content for PDF
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <!-- Header with Profile Photo -->
      <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #4CAF50; padding-bottom: 20px;">
        ${
          personalInfo.profilePhoto?.data
            ? `<img src="${personalInfo.profilePhoto.data}" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 15px;">`
            : ''
        }
        <h1 style="margin: 10px 0; color: #2c3e50;">${
          personalInfo.firstName || ''
        } ${personalInfo.lastName || ''}</h1>
        <div style="color: #666; font-size: 14px;">
          ${personalInfo.email ? `<p>${personalInfo.email}</p>` : ''}
          ${personalInfo.phone ? `<p>${personalInfo.phone}</p>` : ''}
          ${
            personalInfo.address
              ? `<p>${personalInfo.address}, ${personalInfo.city}, ${personalInfo.state}, ${personalInfo.country} ${personalInfo.zipCode}</p>`
              : ''
          }
        </div>
      </div>

      <!-- Work Experience Section -->
      ${
        validWorkExperiences.length > 0
          ? `
        <div style="margin-bottom: 25px;">
          <h2 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 8px; margin-bottom: 15px;">Work Experience</h2>
          ${validWorkExperiences
            .map(
              (exp) => `
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between; align-items: start;">
                <div>
                  <h3 style="margin: 0; color: #2c3e50;">${
                    exp.jobTitle || ''
                  }</h3>
                  <p style="margin: 5px 0 0 0; color: #666; font-style: italic;">${
                    exp.companyName || ''
                  }</p>
                </div>
                <p style="margin: 0; color: #666; font-size: 13px;">${
                  exp.startDate || ''
                } - ${exp.endDate || 'Present'}</p>
              </div>
              ${
                exp.jobDescription
                  ? `<p style="margin: 8px 0; color: #555;">${exp.jobDescription}</p>`
                  : ''
              }
              ${
                exp.achievements
                  ? `<p style="margin: 5px 0; color: #555;"><strong>Achievements:</strong> ${exp.achievements}</p>`
                  : ''
              }
              ${
                Array.isArray(exp.skills) && exp.skills.length > 0
                  ? `<p style="margin: 5px 0; color: #555;"><strong>Skills:</strong> ${exp.skills.join(
                      ', '
                    )}</p>`
                  : ''
              }
            </div>
          `
            )
            .join('')}
        </div>
      `
          : ''
      }

      <!-- Education Section -->
      ${
        validEducations.length > 0
          ? `
        <div style="margin-bottom: 25px;">
          <h2 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 8px; margin-bottom: 15px;">Education</h2>
          ${validEducations
            .map(
              (edu) => `
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between; align-items: start;">
                <div>
                  <h3 style="margin: 0; color: #2c3e50;">${
                    edu.degree || ''
                  }</h3>
                  <p style="margin: 5px 0 0 0; color: #666;">${
                    edu.institution || ''
                  }</p>
                  ${
                    edu.major
                      ? `<p style="margin: 3px 0 0 0; color: #666; font-size: 13px;">${edu.major}</p>`
                      : ''
                  }
                </div>
                <p style="margin: 0; color: #666; font-size: 13px;">${
                  edu.startDate || ''
                } - ${edu.endDate || ''}</p>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      `
          : ''
      }

      <!-- Certifications Section -->
      ${
        validCertifications.length > 0
          ? `
        <div style="margin-bottom: 25px;">
          <h2 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 8px; margin-bottom: 15px;">Certifications</h2>
          ${validCertifications
            .map(
              (cert) => `
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between; align-items: start;">
                <div>
                  <h3 style="margin: 0; color: #2c3e50;">${
                    cert.title || ''
                  }</h3>
                  <p style="margin: 5px 0 0 0; color: #666;">${
                    cert.organization || ''
                  }</p>
                </div>
                <p style="margin: 0; color: #666; font-size: 13px;">${
                  cert.issueDate || ''
                }${cert.expiryDate ? ` - ${cert.expiryDate}` : ''}</p>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      `
          : ''
      }
    </div>
  `;

  // PDF options
  const options = {
    margin: 10,
    filename: `Resume-${new Date().getFullYear()}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
  };

  // Generate and download PDF
  html2pdf().set(options).from(htmlContent).save();
};
