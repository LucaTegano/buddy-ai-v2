#!/bin/bash

echo "========================================="
echo "Testing AI Chat Authentication Flow"
echo "========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if backend is running
echo "1. Checking if backend is running on port 8080..."
if curl -s http://localhost:8080/actuator/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Backend is running${NC}"
else
    echo -e "${YELLOW}⚠ Backend might not be running. Please start it with: cd server && ./mvnw spring-boot:run${NC}"
fi
echo ""

# Check if frontend is running
echo "2. Checking if frontend is running on port 3000..."
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Frontend is running${NC}"
else
    echo -e "${YELLOW}⚠ Frontend might not be running. Please start it with: cd client && npm run dev${NC}"
fi
echo ""

# Check application.properties exists
echo "3. Checking application.properties..."
if [ -f "server/src/main/resources/application.properties" ]; then
    echo -e "${GREEN}✓ application.properties exists${NC}"
    
    # Check JWT config
    if grep -q "security.jwt.expiration-time" server/src/main/resources/application.properties; then
        echo -e "${GREEN}✓ JWT expiration time is configured${NC}"
    else
        echo -e "${RED}✗ JWT expiration time is NOT configured${NC}"
    fi
else
    echo -e "${RED}✗ application.properties does NOT exist${NC}"
fi
echo ""

# Check JWT secret key
echo "4. Checking JWT secret key in .env..."
if [ -f "server/.env" ]; then
    JWT_KEY=$(grep "SECURITY_JWT_SECRET_KEY" server/.env | cut -d '=' -f2)
    if [ ${#JWT_KEY} -gt 30 ]; then
        echo -e "${GREEN}✓ JWT secret key is set (length: ${#JWT_KEY})${NC}"
    else
        echo -e "${RED}✗ JWT secret key might be too short (length: ${#JWT_KEY})${NC}"
    fi
else
    echo -e "${RED}✗ .env file does NOT exist${NC}"
fi
echo ""

echo "========================================="
echo "Next Steps:"
echo "========================================="
echo "1. Restart the backend: cd server && ./mvnw spring-boot:run"
echo "2. Restart the frontend: cd client && npm run dev"
echo "3. Clear browser cookies for localhost"
echo "4. Login again to get a fresh JWT token"
echo "5. Try the AI chat feature"
echo ""
echo "Check the browser console for detailed logs:"
echo "  - [API Request] - Shows the request being made"
echo "  - Token being used: Present (...) - Shows if token is attached"
echo "  - [API Error] - Shows detailed error if authentication fails"
echo ""
echo "Check the backend logs for:"
echo "  - JWT found in Authorization header - Shows token is received"
echo "  - Successfully authenticated user - Shows authentication succeeded"
echo ""
