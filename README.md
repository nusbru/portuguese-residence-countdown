# Portuguese Residence Card Countdown Monitor

A beautiful, Gmail-style web application that calculates the remaining business days to receive your Portuguese residence authorization card. Starting from your AIMA interview date, the application accurately tracks the countdown by excluding weekends and all Portuguese national holidays from the 60 business days limit.

**Privacy-First**: This application does not collect, store, or transmit any user information. All data is saved locally in your browser and never leaves your device.

## Features

- 🎯 **Business Day Calculation**: Accurately calculates business days (excluding weekends and Portuguese national holidays)
- 🇵🇹 **Portuguese Holidays Support**: Automatically excludes all Portuguese national holidays from calculations
- � **Privacy-First**: No user data collection - all information stays in your browser
- �💾 **Local Storage**: All data is saved locally in your browser
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🎨 **Gmail-Style UI**: Clean, modern interface following Google's design principles
- ⚡ **Real-time Updates**: Countdown updates automatically
- 🔧 **Editable Settings**: Modify your interview date and limit anytime

## How to Use

1. **Set Your Interview Date**: Enter the date of your AIMA interview
2. **Configure Business Days Limit**: Set the number of business days AIMA has to deliver (default: 60)
3. **Monitor Progress**: Track your countdown with real-time updates that exclude Portuguese holidays
4. **Edit Settings**: Click the "Edit" button to modify your settings anytime

## Local Development

### Option 1: Direct File Access
Simply open `index.html` in your web browser. All data will be saved in your browser's localStorage.

### Option 2: Using a Local Server
For better development experience, you can serve the files using a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have npx installed)
npx serve .

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Podman Deployment

### Build the Podman Image

```bash
podman build -t portuguese-residence-countdown .
```

### Run the Container

```bash
podman run -d -p 8080:80 --name residence-countdown portuguese-residence-countdown
```

### Access the Application

Open your browser and navigate to `http://localhost:8080`

### Podman Compose (Optional)

```bash
podman-compose up -d
```

## Portuguese National Holidays Included

The application automatically excludes the following Portuguese national holidays from business day calculations:

### Fixed Date Holidays
- **January 1**: New Year's Day (Ano Novo)
- **April 25**: Freedom Day (Dia da Liberdade)
- **May 1**: Labour Day (Dia do Trabalhador)
- **June 10**: Portugal Day (Dia de Portugal)
- **August 15**: Assumption of Mary (Assunção de Nossa Senhora)
- **October 5**: Republic Day (Implantação da República)
- **November 1**: All Saints' Day (Todos os Santos)
- **December 1**: Restoration of Independence (Restauração da Independência)
- **December 8**: Immaculate Conception (Imaculada Conceição)
- **December 25**: Christmas Day (Natal)

### Variable Date Holidays (Easter-dependent)
- **Carnival Tuesday**: 47 days before Easter (Carnaval)
- **Good Friday**: 2 days before Easter (Sexta-feira Santa)
- **Easter Sunday**: Calculated using Gregorian calendar algorithm (Páscoa)
- **Corpus Christi**: 60 days after Easter (Corpo de Deus)

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # Gmail-style CSS
├── script.js           # JavaScript functionality
├── Dockerfile          # Docker configuration
├── nginx.conf          # Nginx server configuration
└── README.md           # This file
```

## Technical Details

### Business Day Calculation
The application correctly calculates business days by:
- Excluding weekends (Saturday and Sunday)
- Excluding all Portuguese national holidays:
  - **Fixed holidays**: New Year's Day, Freedom Day (April 25), Labour Day (May 1), Portugal Day (June 10), Assumption of Mary (August 15), Republic Day (October 5), All Saints' Day (November 1), Restoration of Independence (December 1), Immaculate Conception (December 8), Christmas Day (December 25)
  - **Variable holidays**: Carnival Tuesday, Good Friday, Easter Sunday, Corpus Christi
- Automatically calculating Easter date for variable holidays using the Gregorian calendar algorithm
- Counting only Monday through Friday that are not holidays
- Handling date ranges accurately across multiple years

### Portuguese Holidays Algorithm
The application uses an accurate Easter calculation algorithm and includes:
- All official Portuguese national holidays
- Proper handling of holidays that fall on weekends
- Dynamic calculation for Easter-dependent holidays
- Multi-year support for accurate long-term calculations

### Data Storage & Privacy
All data is stored locally in the browser's localStorage and never transmitted anywhere:
- Interview date
- Business days limit
- Application start date

**Privacy Guarantee**: This application operates entirely offline after loading. No user information is collected, stored on external servers, or transmitted to any third parties. Your personal data remains completely private and under your control.

### Accuracy Note
The countdown calculation now provides more accurate delivery estimates by excluding Portuguese national holidays, which makes the predicted delivery date more realistic for Portuguese administrative processes.

### Browser Compatibility
- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests! 