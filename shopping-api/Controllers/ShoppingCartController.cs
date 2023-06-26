

using Microsoft.AspNetCore.Mvc;
using ShoppingCartApi.Services;

namespace ShoppingCartApi.Controllers;


[ApiController]
[Route("[controller]")]
public class ShoppingCartController : ControllerBase
{
    private readonly ShoppingCartService _shoppingCartService;

    public ShoppingCartController(ShoppingCartService shoppingCartService)
    {
        _shoppingCartService = shoppingCartService;
    }

    [HttpGet("{sessionId}")]
    public IActionResult GetCart(string sessionId)
    {
        var cart = _shoppingCartService.GetCart(sessionId);
        return Ok(cart);
    }

    [HttpPatch()]

    public async Task<IActionResult> CreateOrUpdateCart(ShoppingCartService.UpdateOrCreateCartItemRequest request)
    {
        await _shoppingCartService.UpdateOrCreateItemToCart(request);
        return Ok();
    }

    [HttpDelete()]
    public async Task<IActionResult> DeleteItemFromCart(ShoppingCartService.DeleteCartItemRequest request)
    {
        await _shoppingCartService.DeleteItemFromCart(request);
        return Ok();
    }
}

