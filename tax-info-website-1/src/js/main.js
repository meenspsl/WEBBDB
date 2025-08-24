// Personal Income Tax Calculation
        function calculatePersonalTax() {
            // Get input values
            const income = parseFloat(document.getElementById('income').value) || 0;
            const additionalAllowances = parseFloat(document.getElementById('additionalAllowances').value) || 0;
            const socialSecurity = parseFloat(document.getElementById('socialSecurity').value) || 0;
            const insurance = parseFloat(document.getElementById('insurance').value) || 0;
            const providentFund = parseFloat(document.getElementById('providentFund').value) || 0;
            const rmf = parseFloat(document.getElementById('rmf').value) || 0;
            const ssf = parseFloat(document.getElementById('ssf').value) || 0;
            const donations = parseFloat(document.getElementById('donations').value) || 0;
            
            // Calculate expenses (40% of income, max 100,000)
            let expenses = income * 0.4;
            if (expenses > 100000) expenses = 100000;
            document.getElementById('expenses').value = expenses.toFixed(2);
            
            // Standard allowance
            const standardAllowance = 60000;
            
            // Calculate net income
            const netIncome = income - expenses - standardAllowance - additionalAllowances - 
                             socialSecurity - insurance - providentFund - rmf - ssf - donations;
            
            // Calculate tax based on progressive tax rates
            let tax = 0;
            if (netIncome > 0) {
                if (netIncome <= 150000) {
                    tax = 0;
                } else if (netIncome <= 300000) {
                    tax = (netIncome - 150000) * 0.05;
                } else if (netIncome <= 500000) {
                    tax = 7500 + (netIncome - 300000) * 0.10;
                } else if (netIncome <= 750000) {
                    tax = 27500 + (netIncome - 500000) * 0.15;
                } else if (netIncome <= 1000000) {
                    tax = 65000 + (netIncome - 750000) * 0.20;
                } else if (netIncome <= 2000000) {
                    tax = 115000 + (netIncome - 1000000) * 0.25;
                } else if (netIncome <= 5000000) {
                    tax = 365000 + (netIncome - 2000000) * 0.30;
                } else {
                    tax = 1265000 + (netIncome - 5000000) * 0.35;
                }
            }
            
            // Apply tax credit (if any)
            const taxCredit = 0; // Can be implemented based on conditions
            
            // Final tax amount
            const finalTax = Math.max(0, tax - taxCredit);
            
            // Display results
            document.getElementById('netIncome').textContent = netIncome.toFixed(2);
            document.getElementById('taxAmount').textContent = tax.toFixed(2);
            document.getElementById('finalTax').textContent = finalTax.toFixed(2);
            document.getElementById('personalTaxResult').style.display = 'block';
        }
        
        // Update sign tax rate based on selected type
        function updateSignRate() {
            const signType = document.getElementById('signType').value;
            let rate = 0;
            
            switch(signType) {
                case '1': // Thai signs
                    rate = 20;
                    break;
                case '2': // Non-Thai signs
                    rate = 40;
                    break;
                case '3': // Mixed signs
                    rate = 30;
                    break;
            }
            
            document.getElementById('signRate').value = rate;
        }
        
        // Calculate sign tax
        function calculateSignTax() {
            const signSize = parseFloat(document.getElementById('signSize').value) || 0;
            const signAmount = parseInt(document.getElementById('signAmount').value) || 1;
            const taxRate = parseFloat(document.getElementById('signRate').value) || 0;
            
            const totalArea = signSize * signAmount;
            const taxAmount = totalArea * taxRate;
            
            // Display results
            document.getElementById('taxRate').textContent = taxRate;
            document.getElementById('totalArea').textContent = totalArea.toFixed(2);
            document.getElementById('signTaxAmount').textContent = taxAmount.toFixed(2);
            document.getElementById('signTaxResult').style.display = 'block';
        }
        
        // Print result function
        function printResult(elementId) {
            const printContent = document.getElementById(elementId).innerHTML;
            const originalContent = document.body.innerHTML;
            
            document.body.innerHTML = printContent;
            window.print();
            document.body.innerHTML = originalContent;
            location.reload();
        }
        
        // Initialize sign tax rate on page load
        document.addEventListener('DOMContentLoaded', function() {
            updateSignRate();
            
            // Auto-calculate expenses when income changes
            document.getElementById('income').addEventListener('input', function() {
                const income = parseFloat(this.value) || 0;
                let expenses = income * 0.4;
                if (expenses > 100000) expenses = 100000;
                document.getElementById('expenses').value = expenses.toFixed(2);
            });
        });

        // auto close dropdown-menu //
        document.querySelectorAll('.navbar-nav .dropdown-item').forEach(function(element) {
          element.addEventListener('click', function() {
                var navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    var bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: false});
                    bsCollapse.hide();
                }
            });
        });
